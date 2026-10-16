# lavia-dokidoki
ラヴィアとドキドキしよ

## ブラウザで遊ぶ

`index.html` をブラウザで開いてください。インストールやビルドは不要です。
ローカルサーバーを使う場合は、このディレクトリで `python3 -m http.server 8000` を実行してください。

「はじめから遊ぶ」で開始し、「次へ」で会話を進めます。選択肢によって会話が分岐し、2種類のエンディングに到達します。「もう一度遊ぶ」で再開できます。ボタンはキーボードの Tab と Enter でも操作できます。

HTML・CSS・JavaScript のみで構成した試作版です。キャラクターには同梱の `lavia_normal.jpg.jpg`（1024×1536）を使用し、背景は CSS で表示しています。音声・外部ライブラリは使用していません。セーブ機能はありません。

## HTML プレビューと編集

`index.html` に CSS と JavaScript を埋め込んでいます。CSS・JavaScript の追加取得は不要ですが、立ち絵の `lavia_normal.jpg.jpg` は `index.html` と同じフォルダーで配信してください。JavaScript は DOM の読み込み後に初期化します。

スタイルは `style.css`、会話や操作は `script.js` を編集し、`node build.js` で `index.html` に反映してください（Node.js 標準機能のみ使用）。HTML の構造は `index.html` を直接編集できます。生成された `bundled-style` / `bundled-script` の区間は直接編集しないでください。

プレビュー側がインライン JavaScript 自体を禁止している場合は、ローカル HTTP サーバーから通常のブラウザで開いてください。
