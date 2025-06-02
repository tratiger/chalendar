# Chalender
Chat and calendar—integrated web app



## きまりごと
コミットメッセージ<br>
[fix]：バグ修正&emsp;
[add]：新規（ファイル）機能追加&emsp;
[update]：機能修正（バグではない）&emsp;
[remove]：削除（ファイル）



## フロントエンド開発仕様
概要:CSRのSPA。随時SSRに拡張化

・実行環境  node.js v22.16.0 <br>
&emsp; メモ　Dockerでビルドしてください

・本番環境リバースプロキシ　nginx <br>
&emsp;  使用サービス　AWS c3

・フレームワーク　react router v7 <br>
&emsp;  ドキュメント　https://react-router-docs-ja.techtalk.jp/  <br>
&emsp;  メモ　去年v7でremixと統合しルータパッケージからフレームワークに進化。状態管理はredux使わずにデフォルトで。b vite c tailwindcss

・websocket  socket.IO <br>
&emsp;  ドキュメント　https://socket.io/docs/v4/

・ui 生成　v0dev <br>
&emsp;  ドキュメント　https://ui.shadcn.com/docs <br>
&emsp;  メモ　読みやすいようにgptでコンポーネント分解



## バックエンド開発仕様
