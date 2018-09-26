Images for Cloud Build
======================

[firebase](./firebase)
----------------------

firebase image used in project's [cloudbuild.yaml](../cloudbuild.yaml)

```
cd firebase
gcloud builds submit --project $PROJECT --config=cloudbuild.yaml .
```
