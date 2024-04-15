---
title: "flutterでメモアプリ、iOS/Android同時開発"
date: "2023-04-06"
---
# Flutterでメモアプリ、iOS/Android同時開発

こんにちは。木下亮佑です。

今回はFlutterでメモアプリを開発したので、そちらの解説をしていきます。

今回のソースコードはこちら

> [GitHub - blackneko39/Meemo](https://github.com/blackneko39/Meemo)

---

## Flutter（フラッター）とは？

[Flutter](https://flutter.dev/)とは2018年にGoogleが開発した、アプリ開発フレームワークです。

従来のフレームワークとは違い、iOS/Androidのアプリを同時に開発することができます。

あまり聞きなれないDart言語でプログラムを書きますが、書き方はJavaと似ています。

導入方法は他に解説しているサイトがたくさんあるため、省かせていただきます。

---

## 簡単なメモアプリをつくろう

今回はシンプルなメモアプリを作ります。

多機能なメモアプリはたくさん溢れていますが、機能をとことん絞ったものは逆に少ないと思います。

また、機能が多いとUIがごちゃごちゃして使いにくくなる原因にもなります。

そして、あえてメモを削除する機能を省いてみようと思います。

**消せないことで生まれるロマンがそこにはある......**

---

## 必要なページ

メモアプリを作る上で必要なページを挙げます。

- メモを書くページ

- 書いたメモを羅列するページ

- そのメモの情報を表示するページ（書いた日付など）

主にこの３つのページが、最低限必要となります。

---

## 技術的な課題

また、技術的な課題もあります。

- メモを保存するためにデータベースを構築しなければならない

- メモを追加したタイミングでページを更新しなければならない、など

これらを踏まえた上で、まず作るコンポーネントを決めます。

---

必要なページ

- HomePage (それぞれのページを取りまとめるページ)

- WriterPage (メモを書くページ)　

- ListUpPage (書いたメモを羅列するページ)

- DetailPage (メモの情報を表示するページ)

必要なコンポーネント

- Database (データベースとのやり取りをする)

- Memo (メモの型を作る)

- Notifier (メモを追加したことを知らせる)

これらでアプリを構成します。

```t
[lib]
--main.dart
--notifier.dart
--[memo]
----db.dart
----memo.dart

pubspec.yaml
```

---

## 依存関係 (dependences)

```yaml
dependencies:
  flutter:
    sdk: flutter

  cupertino_icons: ^1.0.2
  flutter_riverpod:
  sqflite:
  path:
  shared_preferences: ^2.2.2
```

画面制御系 : flutter_riverpod

データベース系 : sqflite, path, shared_preferences

---

## memo.dart

```dart
class Memo {
  final String id;
  final String text;
  final String date;
  Memo({required this.id, required this.text, required this.date});

  Map<String, Object?> toMap() {
    return {
      'id': id,
      'text': text,
      'date': date
    };
  }
}
```

まずメモの型を作ります。

**id, text(メモの文章), date(書いた日付)** をもつクラスを作成します。

---

## db.dart

```dart
import 'package:memo/memo/memo.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

class DB {
  Future<Database> initDatabase() async {
    String path = join(await getDatabasesPath(), "memo.db");
    return await openDatabase(
      path,
      version: 1,
      onCreate: (Database db, int version) async {
        await db.execute('''
        CREATE TABLE memo(
          id TEXT PRIMARY KEY,
          text TEXT,
          date TEXT
        )
      ''');
      },
    );
  }

  Future<List<Map<String, dynamic>>> getAllData() async {
    final Database db = await initDatabase();
    return await db.query('memo');
  }

  Future<List<Memo>> getMemos() async {
    final Database db = await initDatabase();
    final List<Map<String, dynamic>> maps =  await db.query('memo');
    return List.generate(maps.length, (i) {
      return Memo(
        id: maps[i]['id'],
        text: maps[i]['text'],
        date: maps[i]['date'],
      );
    });
  }

  Future<void> insertMemo({required Memo memo}) async {
    final Database db = await initDatabase();
    await db.insert(
      'memo',
      memo.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }
}
```

こちらがデータベースを制御するクラスです。

データベースには**SQLite**を使用しています。

getMemosメソッドでデータベースから全てのメモを取得。

insertMemoメソッドで新しいメモをデータベースに追加。



メモを消す必要はないので、実装しているメソッドは **"取得"** と **"追加"** のみです。

---

## notifier.dart

```dart
class MemoNotifier extends StateNotifier<List<Memo>> {
  final DB db = DB();
  MemoNotifier(super.state) {
    initData();
  }

  void initData() async {
    await db.initDatabase();
    state = await db.getMemos();
  }

  void addMemo({required Memo memo}) {
    state = [...state, memo];
    db.insertMemo(memo: memo);
  }
}
```

RiverPod パッケージを使い、リストを監視することで、値が更新された時にウィジェットを再描画できます。

これをしないと再描画されないため、新しくメモを追加してもリストには表示されません。

---

それではそれぞれのページのページのプログラムを解説していきます。

## Home Page

```dart
class HomePage extends StatefulWidget {
  const HomePage({super.key, required this.title});

  final String title;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> with WidgetsBindingObserver {

  Future<void> initData() async {
    final prefs = await SharedPreferences.getInstance();
    textController.text = prefs.getString('stored') ?? '';
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    initData();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  Future<void> didChangeAppLifecycleState(AppLifecycleState state) async {
    log(state.name);
    switch (state) {
      case AppLifecycleState.inactive:

        final prefs = await SharedPreferences.getInstance();
        if (textController.value.text.isNotEmpty) {
          await prefs.setString('stored', textController.value.text);
        }

        break;
      case AppLifecycleState.paused:
        break;
      case AppLifecycleState.resumed:
        break;
      case AppLifecycleState.detached:
        break;
      case AppLifecycleState.hidden:
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: GestureDetector(
        onTap: () {
          FocusScope.of(context).unfocus();
        },
        child: Scaffold(
            appBar: AppBar(
              title: Text(widget.title),
              bottom: const TabBar(
                tabs: [
                  Tab(icon: Icon(Icons.textsms)),
                  Tab(icon: Icon(Icons.list)),
                ],
              ),
            ),
            body: const TabBarView(
              children: [WriterPage(), ListUpPage()],
            )
        )
      )
    );
  }
}
```

## Writer Page

```dart
class WriterPage extends ConsumerWidget {
  final _pd = 10.0;

  const WriterPage({super.key});

  Future<void> clear() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.clear();
    textController.clear();
  }

  String _normalizeText(String text) {
    String str = text.trim();
    str = str.replaceAll(RegExp(r'\n(\n)+'), '\n\n');
    return str;
  }

  Memo _makeMemo(String text) {
    Memo memo = Memo(id: UniqueKey().toString(), text: text, date: DateTime.now().toUtc().toIso8601String());
    return memo;
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Builder(builder: (context) =>
       Stack(
          children: [
            SizedBox(
                height: (MediaQuery.of(context).size.height - (Scaffold.of(context).appBarMaxHeight ?? 0)
                    .floor()),
                width: MediaQuery.of(context).size.width - _pd,
                child: Padding(
                  padding: EdgeInsets.only(left: _pd, bottom: _pd * 2.0),
                  child: TextField(
                    controller: textController,
                    expands: true,
                    maxLines: null,
                    decoration: const InputDecoration(
                      border: InputBorder.none
                    ),
                  ),
                )
            ),
            Align(
                alignment: Alignment.bottomRight,
                child: Padding(
                  padding: EdgeInsets.all((MediaQuery.of(context).size.width / _pd)),
                  child: IconButton(
                    icon: const Icon(Icons.add),
                    onPressed: () {
                      String text = _normalizeText(textController.value.text);
                      if (text.isNotEmpty) {
                        ref.watch(memoNotifier.notifier)
                            .addMemo(memo: _makeMemo(text));
                        clear();
                      }
                    },
                    color: Colors.blue,
                    iconSize: 32,
                  ),
                )
            )
          ],
        )
    );
  }
}
```

## ListUp Page

```dart
class ListUpPage extends ConsumerWidget {
  const ListUpPage({super.key});

  Future<void> _wait() async {
    Future.delayed(const Duration(milliseconds: 500));
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final reversedList = ref.watch(memoNotifier).reversed;
    return FutureBuilder(
        future: _wait(),
        builder: (context, snapshot) {
      return ListView.builder(
          itemCount: reversedList.length,
          itemBuilder: (context, index) {
            return GestureDetector(
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.symmetric(
                          vertical: 20.0, horizontal: 50.0),
                      child: Text(reversedList.elementAt(index).text),
                    ),
                    const Divider(),
                  ]
                ),
                onTap: () {
                  Navigator.of(context).push(
                      MaterialPageRoute(builder: (context)
                        => DetailPage(memo: reversedList.elementAt(index))
                  ));
                },
            );
          },
          
      );
    });
  }
}
```

## Detail Page

```dart
class DetailPage extends ConsumerWidget {
  final Memo memo;
  const DetailPage({super.key, required this.memo});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
      ),
      body: ListView(
        children: memo.toMap().entries.map((e) =>
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 15.0, horizontal: 30.0),
                child: Text('${e.key}: ${e.value}'),
              )
            ).toList(),
        ),
    );
  }
}
```

(執筆中)