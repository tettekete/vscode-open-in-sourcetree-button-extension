# Open In Sourcetree Button

VSCode のステータスバー右側に Sourcetree を開くためのアイコンを追加する機能拡張です。

カレントファイルの属するワークスペースフォルダ、若しくは有効なワークスペースのフォルダを SourceTree で開きます。


## 必要環境

Sourcetree がインストールされている必要があります


## コンフィグ

**Soucetree Path**(`openSourcetreeButton.SourcetreePath`):

空白時はデフォルトで以下の場所にある Sourcetree が使用されます。

- Windows（以下のいずれか）:
	- `C:\Program Files (x86)\Atlassian\SourceTree\SourceTree.exe`
	- `C:\Program Files\Atlassian\SourceTree\SourceTree.exe`
	- `<User-Home>\AppData\Local\SourceTree\SourceTree.exe`
- macOS: `Sourcetree.app`_(mac では通常フルパスである必要はありません)_

Sourcetree が別の場所にインストールされており起動できない場合、この設定で Sourcetree アプリケーションへのフルパスを指定して下さい。

コマンドパレットから `Open In SourceTree Button: SourceTree のパスをファイル選択ダイアログで設定する` を選んでファイル選択ダイアログから設定することも出来ます。

_注：セキュリティ上の理由によりファイル名は SourceTree.exe か Sourcetree.app でなければなりません。_

**Icon**(`openSourcetreeButton.icon`):

ステータスバー上のアイコン(Codeicon)を指定出来ます。指定出来るアイコン名は https://code.visualstudio.com/api/references/icons-in-labels#icon-listing を参照してください。

デフォルトでは Soucetree のアイコンに似ている `light-bulb` が設定されています。



**Priority**(`openSourcetreeButton.priority`):

ステータスバー上の並び順を決定するためのプライオリティー値です。
