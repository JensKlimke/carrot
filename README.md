# Carrot Stack - System Specification document

## TODO 

- [ ] Follow the login process. Several redirects and state changed on the two frontends lead to flickering and unpleasant user experience. 
  - [ ] Add a loading state to the fin app, when session is loaded but user token in not yet processed
  - [ ] Set loading in auth app, when user is signed in and the page is about to redirect (Don't show the account page until)
  - [ ] Dont show the sign in page until the tokens are processed on the fin app page.