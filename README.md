# 行灯職人への道 - https://satsukita-andon.com

![ci](https://github.com/tousetsukai/satsukita-andon.com/workflows/ci/badge.svg)

行灯職人への道 (satsukita-andon.com) is a website to record and support _andon-gyoretsu_ (行灯行列), which is one of the most exciting events of Sapporo-Kita High School (札幌北高校).

## Commands

### Install project:

```sh
$ npm i
```

### Statically check type:

```sh
$ make start-type-check
```

### Build project:

```
npm run build
```

### Run Next.js development:

```
make start-client
```

### Run Firebase locally for testing:

```
make start-functions
```

### Deploy it to the cloud with Firebase:

```
npm run deploy
```

### Clean dist folder

```
npm run clean
```

## Coding Style

See [.prettierrc](./.prettierrc).

## Contributing

1. Fork it (https://github.com/tousetsukai/satsukita-andon.com/fork)
2. Create your feature branch (git switch -c my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request
