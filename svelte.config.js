import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      // Must NOT be 'index.html' — that overwrites the prerendered homepage
      // with the empty SPA shell.
      fallback: '404.html',
      precompress: false,
      strict: true
    })
  }
};