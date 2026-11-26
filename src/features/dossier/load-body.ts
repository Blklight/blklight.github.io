import { ARTICLE_BODIES } from "./mock";

const cache = new Map<string, Promise<string>>();

/** Simulated network: 300–800 ms, cached so a hover prefetch makes the click instant. */
export function loadArticleBody(articleId: string): Promise<string> {
  let pending = cache.get(articleId);
  if (!pending) {
    const delay = 300 + Math.random() * 500;
    pending = new Promise((resolve, reject) => {
      setTimeout(() => {
        const body = ARTICLE_BODIES[articleId];
        if (body === undefined) {
          cache.delete(articleId);
          reject(new Error(`Artigo não encontrado: ${articleId}`));
        } else {
          resolve(body);
        }
      }, delay);
    });
    cache.set(articleId, pending);
  }
  return pending;
}

export function prefetchArticleBody(articleId: string) {
  loadArticleBody(articleId).catch(() => {});
}
