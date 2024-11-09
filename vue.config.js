module.exports = {
  devServer: {
    port: 8080,  // Mengubah port Vue ke 8080
    proxy: 'http://localhost:8081',  // Proxy untuk API ke port 8081
  },
};
