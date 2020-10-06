## RUN LOCALLLY

Run de following commands for running the project locally

First download the key id from [GCP](https://console.cloud.google.com/iam-admin/serviceaccounts)
```
$ export GOOGLE_APPLICATION_CREDENTIALS="/keyId/path/key.json"
```
then run the function
```
$ firebase emulators:start
```