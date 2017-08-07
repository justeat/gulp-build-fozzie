const modifiedFiles = danger.git.modified_files;
const newFiles = danger.git.created_files;

// Fail if there isn’t a CHANGELOG entry – should update for every PR
if (!danger.git.modified_files.includes('CHANGELOG.md')) {
    const changelogLink = 'https://github.com/justeat/gulp-build-fozzie/blob/master/CHANGELOG.md';
    fail(`:memo: Please include a CHANGELOG entry. You can find the current version at <a href="${changelogLink}">CHANGELOG.md</a>`);
}

// Check for version update
const hasPackageJsonChanged = danger.git.modified_files.includes('package.json');


const packageDiff = danger.git.JSONDiffForFile('package.json');

packageDiff.then(() => {
    if (!hasPackageJsonChanged || (hasPackageJsonChanged && !packageDiff.version)) {
        const semverLink = 'https://docs.npmjs.com/getting-started/semantic-versioning';
        fail(`:exclamation: This PR should include a <a href="${semverLink}">SEMVER</a> version bump, so that it can be published once merged.`);
    }
}, (err) => {
    console.log(err);
});


const taskFiles = modifiedFiles.filter(path => path.startsWith('tasks'));
const configChanged = modifiedFiles.includes('config.js');
const readmeChanged = modifiedFiles.includes('README.md');

if ((taskFiles.length > 0 || configChanged) && !readmeChanged) {
    warn(`:memo: If you’ve changed the config or task files, please check that the README is still up-to-date.`);
}


// Message on deletions
if (danger.github.pr.deletions > danger.github.pr.additions) {
  message(':fire: :clap: You’re a deletion machine!');
}
