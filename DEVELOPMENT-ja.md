開発について
============

ローカルでの開発
----------------

### 準備

```
$ npm i   # あるいは `npm ci`
```

### 型検査

```
$ make start-type-check
```

### Firebase なしでの起動

```
$ make start-client
```

### Firebase ありでの起動

```
$ npm run build
$ make start-functions
```

デプロイ
--------

### 開発環境

master ブランチにマージされると[開発環境](https://dev.satsukita-andon.com)にデプロイされます。

[GitHub Actions のワークフロー](.github/workflows/ci.yaml)参照。

### 本番環境

`vX.Y.Z` といったタグが切られると[本番環境](https://next.satsukita-andon.com)にデプロイされます。

[GitHub Actions のワークフロー](.github/workflows/ci.yaml)参照。

### 手動デプロイ

自身で用意した環境にデプロイする場合は以下のようにします。

```
$ firebase login
$ DEPLOY_TARGET=<firebase-project-id> npm run deploy
```

## コーディング規約

[.prettierrc](./.prettierrc) 参照。
