import lozad from 'lozad';
<% if (options.polyfill) { %>require('intersection-observer');<% } %>

export default async function (ctx, inject) {
  if (lozad) {
    const lozadOptions = [
      '<%= options.selector %>',
      <%= JSON.stringify(options.observer) %>
    ]
    const observer = lozad(...lozadOptions);
    inject('lozad', observer);
  }
};
