const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.SECRET;
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      // { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      // { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      // { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      // { url: /\/api\/v1\/orders(.*)/, methods: ["POST", "OPTIONS"] },
      { path: /(.*)/ },
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }

  done();
}

module.exports = authJwt;
