<?php

// カレンダークラスファイル読み込み
require_once('calendar.php');

// エスケープ関数
function h($s) {
	return htmlspecialchars($s, ENT_QUOTES, "UTF-8");
}

// Queryパラメータから年月を取得
// パラメータなしもしくは不正の場合は今月を表示する
$ym = isset($_GET['ym']) ? $_GET['ym'] : date("Y-m");

// カレンダーオブジェクトの生成
$cal = new Calendar($ym);
$cal->create();

?>

<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<title>PHPでカレンダー</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>

	<table>
		<thead>
			<tr>
				<th><a href="?ym=<?php echo h($cal->prev()); ?>">&laquo;</a></th>
				<th colspan="5"><?php echo h($cal->yearMonth()); ?></th>
				<th><a href="?ym=<?php echo h($cal->next()); ?>">&raquo;</a></th>
			</tr>
			<tr>
				<th>日</th>
				<th>月</th>
				<th>火</th>
				<th>水</th>
				<th>木</th>
				<th>金</th>
				<th>土</th>
			</tr>
		</thead>
		<tbody>
			<?php
				foreach ($cal->getWeeks() as $week) {
					echo $week;
				}
			?>
		</tbody>
	</table>

</body>
</html>