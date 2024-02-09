# List of steps to follow to push react components to Frontend Library

1. Command to create package for react/react-native (by default, it creates folder in the `/packages`)

- for react package: `lerna create @React_UI_Lib/{PackageName} --yes`
- for react-native package: `lerna create @RN_UI_Lib/{PackageName} --yes`

  - If you want to create in other dir e.g. `/react-packages` (change `atoms`/`molecules` with respect to your need)

    - for react package: `lerna create @React_UI_Lib/{PackageName} react-packages/atoms --yes`
    - for react-native package: `lerna create @RN_UI_Lib/{PackageName} react-native-packages/atoms --yes`

2.  Remove `“repository”` field from `package.json` of your package.

3.  Replace `"publishConfig"` with this :
    ```json
        "publishConfig": {
            "access": "public"
        }
    ```

### If the package would be served with `dist`, then follow below steps after step 3

4.  Add `"dist"` in `"files"` field.

    ```json
    "files": [
        "dist",
        "lib"
    ]
    ```

5.  Update following fields in `package.json` of your package

    - If the package is in typescript

    ```json
    {
      "main": "dist/{PackageName}.cjs.js",
      "module": "dist/{PackageName}.esm.js",
      "src": "lib/{PackageName}.tsx"
    }
    ```

    - If the package is simple JSX (If you are using .js extension, then please rename them with the `.jsx` extension)

    ```json
    {
      "main": "dist/{PackageName}.cjs.js",
      "module": "dist/{PackageName}.esm.js",
      "src": "lib/{PackageName}.jsx"
    }
    ```

### Running lib-builder.js

- `lib-builder.js` runs rollup job onto the packages which are changed. Make sure you have src field in your `package.json` otherwise rollup won't pick it up.

- Command: `node lib-builder {package_name_1} {package_name_2} ... {package_name_N}`

### Commit format

- For your packages to be tracked by **Frontend Library Package Version Tracker**, your commit messages should be formatted in a certain way. e.g:

```sh
git commit -m "MR-11462 HTML: {PackageName}@{version}@{Description}, {PackageName2}@{version}@{Description}, {PackageName3}@{version}@{Description}"

git commit -m "MR-11462 HTML: AppButton@1.0.2@addding onPress support so that the component can be used as a button, CalendarCommon@1.0.2@addding onPress support so that the component can be used as a button"
```

**COMMIT MESSAGE ALERT**

1. It is strongly recommended to check the validity of your commit message before commiting your changes. Please run `check-commit-message.js` script to check the validity of your commit message, otherwise your packages would not be tracked by the **Frontend Library Package Version Tracker**.

```sh
# Run this command
node check-commit-message "commit_message"

# Example
node check-commit-message "MR-11462 HTML: AppButton@1.0.2@adding TouchableOpacity prop, CalendarCommon@1.0.2@addding onPress support"
```

### Pushing changes

- For pushing your changes in _`release`_: `git push origin HEAD:refs/for/release`
- For pushing your changes in _`fb_frontend_flights`_: `git push origin HEAD:refs/for/fb_frontend_flights`
- For pushing your changes in _`storybook (fb_storybook_ui)`_: `git push origin HEAD:refs/for/fb_storybook_ui`

### Important Notes

- Node version: `16`
- Lerna version: `8.1.2`
- Please install `node_modules` using `npm ci` and not `npm install`.
- Please do not commit any changes to `package.json` and `package-lock.json`, especially if they are regarding `fs-extra`.
