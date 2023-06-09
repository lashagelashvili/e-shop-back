const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.SECRET;
  const api = process.env.API_URL;

  return jwt({
    secret,
    algorithms: ["HS256"],
    // isRevoked: isRevokedCallback,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/orders(.*)/, methods: ["GET", "OPTIONS", "POST"] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

const isRevokedCallback = async (req, token) => {
  console.log(req, "kkkkk");
  console.log(token, "token;;;;;;");
  // const issuer = token.payload.iss;
  // const tokenId = token.payload.jti;
  // const token2 = await data.getRevokedToken(issuer, tokenId);
  // return token2 !== "undefined";
};

module.exports = authJwt;
