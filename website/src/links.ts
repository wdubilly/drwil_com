// Every external destination of the site lives here, so the link check has a single list to verify.
export const REPO = "https://github.com/wdubilly/drwil";
// Latest published release at the time of writing; update it with the README's installation command.
export const RELEASE = "v0.6.4";
export const TARBALL = `${REPO}/releases/download/${RELEASE}/drwil-${RELEASE.slice(1)}.tgz`;
export const INSTALL_COMMAND = `npm install -D ${TARBALL}`;

export const LINKS = {
  repo: REPO,
  readme: `${REPO}#readme`,
  install: `${REPO}#installation`,
  issues: `${REPO}/issues`,
  license: `${REPO}/blob/master/LICENSE`,
  tarball: TARBALL,
} as const;
