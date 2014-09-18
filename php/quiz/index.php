<?php

session_start();

function h($s) {
	return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

$quizList = array(
	array(
		'q' => 'HTMLのHは何の略？',
		'a' => array('Hyper', 'Hop', 'Hip', 'Hot')
	),
	array(
		'q' => 'HTMLのTは何の略？',
		'a' => array('Text', 'Twitter', 'Top')
	),
	array(
		'q' => 'HTMLのMは何の略？',
		'a' => array('Markup', 'Min', 'Max', 'More')
	),
	array(
		'q' => 'HTMLのLは何の略？',
		'a' => array('Language', 'List', 'Look', 'Lost')
	)
);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if ($_POST['answer'] === $quizList[$_POST['qnum']]['a'][0]) {
		echo "正解！";
		exit;
	}
}
// var_dump($quizList);

$qnum = mt_rand(0, count($quizList) - 1);
$quiz = $quizList[$qnum];

$_SESSON['qnum'] = (string)$qnum;

shuffle($quiz['a']);

?>
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<title>簡単クイズ</title>
</head>
<body>
<p>Q. <?php echo h($quiz['q']); ?></p>
<?php foreach ($quiz['a'] as $answer) : ?>
	<form action="" method="post">
		<input type="submit" name="answer" value="<?php echo h($answer); ?>">
		<input type="hidden" name="qnum" value="<?php echo h($_SESSON['qnum']); ?>">
	</form>
<?php endforeach; ?>
</body>
</html>