import { Post } from '@/lib/types';
import { getValidImageUrl, isValidImageUrl } from './image-utils';
import { normalizeSlug } from './slug-utils';

/**
 * 블로그 포스트 전처리 - 이미지 URL과 슬러그 정규화
 * @param post 전처리할 포스트 객체
 * @returns 전처리된 포스트 객체 (원본을 변경하지 않음)
 */
export function preprocessBlogPost(post: Post): Post {
  if (!post) return post;
  
  // 원본 객체를 변경하지 않고 새로운 객체 반환
  const processed = {
    ...post,
    slug: normalizeSlug(post.slug),
    featured_image: post.featured_image ? getValidImageUrl(post.featured_image) : undefined,
  };
  
  // 마크다운 콘텐츠 내 이미지 URL 정규화
  if (post.content) {
    processed.content = normalizeMarkdownImageUrls(post.content);
  }
  
  return processed;
}

/**
 * 블로그 포스트 목록 전처리 - 이미지 URL과 슬러그 정규화
 * @param posts 전처리할 포스트 배열
 * @returns 전처리된 포스트 배열 (원본을 변경하지 않음)
 */
export function preprocessBlogPosts(posts: Post[]): Post[] {
  if (!posts?.length) return posts || [];
  
  return posts.map(post => preprocessBlogPost(post));
}

/**
 * 마크다운 콘텐츠에서 이미지 URL 추출
 * @param markdown 마크다운 문자열
 * @returns 이미지 URL 배열
 */
export function extractImagesFromMarkdown(markdown: string): string[] {
  if (!markdown) return [];
  
  // 이미지 문법 (![alt](url) 또는 <img src="url" />) 찾기
  const markdownImagePattern = /!\[(.*?)\]\((.*?)\)/g;  // ![alt](url)
  const htmlImagePattern = /<img.*?src=["'](.*?)["'].*?>/g;  // <img src="url" />
  
  const images: string[] = [];
  let match;
  
  // 마크다운 이미지 문법 처리
  while ((match = markdownImagePattern.exec(markdown)) !== null) {
    if (match[2] && match[2].trim()) {
      images.push(match[2].trim());
    }
  }
  
  // HTML 이미지 태그 처리
  while ((match = htmlImagePattern.exec(markdown)) !== null) {
    if (match[1] && match[1].trim()) {
      images.push(match[1].trim());
    }
  }
  
  return [...new Set(images)]; // 중복 제거
}

/**
 * 마크다운 콘텐츠의 이미지 URL을 정규화
 * @param markdown 마크다운 문자열
 * @returns 이미지 URL이 정규화된 마크다운 문자열
 */
export function normalizeMarkdownImageUrls(markdown: string): string {
  if (!markdown) return markdown;
  
  // 마크다운 이미지 형식 (![alt](url))
  let normalizedMarkdown = markdown.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    (match, alt, url) => {
      const normalizedUrl = getValidImageUrl(url.trim());
      return `![${alt}](${normalizedUrl})`;
    }
  );
  
  // HTML 이미지 태그 형식 (<img src="url" />)
  normalizedMarkdown = normalizedMarkdown.replace(
    /<img(.*?)src=["'](.*?)["'](.*?)>/g,
    (match, prefix, url, suffix) => {
      const normalizedUrl = getValidImageUrl(url.trim());
      return `<img${prefix}src="${normalizedUrl}"${suffix}>`;
    }
  );
  
  return normalizedMarkdown;
}

/**
 * 마크다운 콘텐츠의 모든 이미지 관련 URL 및 문제를 수정
 * 포괄적인 이미지 변환 및 수정 함수
 * @param markdown 마크다운 문자열
 * @returns 수정된 마크다운 문자열
 */
export function fixAllMarkdownImages(markdown: string): string {
  if (!markdown) return markdown;
  
  // 마크다운 이미지 링크 처리 (![alt](url))
  let fixedMarkdown = markdown.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    (match, alt, url) => {
      // URL이 비어있거나 유효하지 않은 경우 처리
      if (!url || !url.trim()) {
        return `![${alt || '이미지'}](/images/placeholder.jpg)`;
      }
      
      // URL 정규화
      const cleanUrl = url.trim()
        .replace(/\s+/g, '') // 공백 제거
        .replace(/^"(.*)"$/, '$1') // 따옴표 제거
        .replace(/^'(.*)'$/, '$1'); // 작은따옴표 제거
      
      // 이미지 URL 검증 및 정규화
      const validUrl = getValidImageUrl(cleanUrl);
      return `![${alt || ''}](${validUrl})`;
    }
  );
  
  // HTML 이미지 태그 처리 (<img src="url" />)
  fixedMarkdown = fixedMarkdown.replace(
    /<img(.*?)src=["'](.*?)["'](.*?)>/g,
    (match, prefix, url, suffix) => {
      // URL이 비어있거나 유효하지 않은 경우 처리
      if (!url || !url.trim()) {
        return `<img${prefix}src="/images/placeholder.jpg"${suffix}>`;
      }
      
      // URL 정규화
      const cleanUrl = url.trim()
        .replace(/\s+/g, '') // 공백 제거
        .replace(/^"(.*)"$/, '$1') // 따옴표 제거
        .replace(/^'(.*)'$/, '$1'); // 작은따옴표 제거
      
      // 이미지 URL 검증 및 정규화
      const validUrl = getValidImageUrl(cleanUrl);
      return `<img${prefix}src="${validUrl}"${suffix}>`;
    }
  );
  
  // 깨진 HTML 형식 수정 (닫는 태그 없는 경우 등)
  fixedMarkdown = fixedMarkdown.replace(
    /<img(.*?)(?!\/)>(?!<\/img>)/g,
    match => match.replace(/>$/, ' />')
  );
  
  return fixedMarkdown;
}

/**
 * 블로그 포스트의 마크다운 내용을 분석하여 내용 중 문제가 있는 요소들을 배열로 반환
 * @param content 마크다운 콘텐츠
 * @returns 문제 항목 배열 (이미지 URL 문제, 빈 링크 등)
 */
export function analyzeMarkdownContent(content: string): Array<{type: string, issue: string, original: string}> {
  if (!content) return [];
  
  const issues: Array<{type: string, issue: string, original: string}> = [];
  
  // 이미지 URL 문제 확인
  const images = extractImagesFromMarkdown(content);
  images.forEach(imgUrl => {
    if (!isValidImageUrl(imgUrl)) {
      issues.push({
        type: 'invalid-image-url',
        issue: `유효하지 않은 이미지 URL: ${imgUrl}`,
        original: imgUrl
      });
    }
  });
  
  // HTML img 태그 문제 확인
  const imgTagRegex = /<img\s+[^>]*src=['"]([^'"]+)['"]/gi;
  let match;
  while ((match = imgTagRegex.exec(content)) !== null) {
    const srcUrl = match[1].trim();
    if (!isValidImageUrl(srcUrl)) {
      issues.push({
        type: 'invalid-html-image-url',
        issue: `유효하지 않은 HTML 이미지 URL: ${srcUrl}`,
        original: srcUrl
      });
    }
  }
  
  // 빈 링크 확인
  const emptyLinkRegex = /\[.*?\]\(\s*\)/g;
  const emptyLinks = content.match(emptyLinkRegex);
  if (emptyLinks) {
    emptyLinks.forEach(link => {
      issues.push({
        type: 'empty-link',
        issue: '빈 링크 발견',
        original: link
      });
    });
  }
  
  return issues;
} 