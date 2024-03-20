export const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "'data:'", "'data'", "data:", "data"],
      connectSrc: ["'self'"],
    },
  },
};
