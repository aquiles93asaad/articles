export const mapNodesToArticles = (response) => {
  const nodes = response.nodes;
  if (nodes) {
    return nodes.map((item) => item.node);
  }
  // In case the response don't come with "nodes"
  return [];
};