exports.auditLogger = (req, res, next) => {
  const user = req.user ? `User: ${req.user.id}` : "Guest";
  console.log(
    `[AUDIT] ${new Date().toISOString()} - ${req.method} ${
      req.originalUrl
    } - ${user}`
  );
  next();
};
