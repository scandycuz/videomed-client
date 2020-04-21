const Text = {
  paramaterize: (str) => {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
  }
}

export default Text;
