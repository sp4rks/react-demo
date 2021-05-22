const AuthConfig = {
  client_id: "939a0f54-59c5-48e5-bd35-d6db97250460",
  redirect_uri: "http://localhost:3000/authentication/callback",
  response_type: "code",
  post_logout_redirect_uri: "http://localhost:3000/",
  scope: "openid profile",
  authority: "https://auth.pingone.asia/65f3a9e5-6dc1-40ee-bbc8-373efcca666c/as",
  silent_redirect_uri: "http://localhost:3000/authentication/silent_callback",
  automaticSilentRenew: true,
  loadUserInfo: true
};

export default AuthConfig;
