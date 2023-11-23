# Introduction

This illustrative example highlights the integrated utilization of both frontend and backend extensions.

This column extension example uses a configuration file to define the publications and target types for which publish status information will be displayed.

In a real-world use case, where data is to be displayed for many publications or where publications and target types are created after the extension is deployed, the extension should include logic to retrieve this information dynamically.

## Structure

- `publish-status-api` - the backend extension;

  - `src` - source code demonstrating the implementation of the backend extension.
    It is included solely for illustrative purposes. The repository does not contain any mechanism to compile the `src` files;
  - `Example.PublishStatus-1.0.0.0.zip` - the backend extension is presented as an independent add-on;

- `published-to-column` - the frontend extension;

## How it works

1. The frontend extension requires the backend extension to be uploaded and enabled in the Add-ons Service.
   Please upload the `publish-status-api/Example.PublishStatus-1.0.0.0.zip` file to the Add-ons Service.

2. Build and pack the `published-to-column` frontend extension and upload it to the Add-ons Service.
