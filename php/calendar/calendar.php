<?php

class Calendar {
	protected $weeks = array();
	protected $timeStamp;

	public function __construct($ym) {
		$this->timeStamp = strtotime($ym . "-01");

		if ($this->timeStamp === false) {
			$this->timeStamp = time();
		}
	}

	public function create() {
		// 最終日？
		$lastDay = date("t", $this->timeStamp);

		// 1日は何曜日？
		// 0: Sun ... 6: Sat
		$youbi = date("w", mktime(0,0,0,date("n", $this->timeStamp),1,date("Y", $this->timeStamp)));

		// var_dump($lastDay);
		// var_dump($youbi);
		// exit;

		$weeks = array();
		$week ='';

		$week .= str_repeat('<td></td>', $youbi);

		for ($day = 1; $day <= $lastDay; $day++, $youbi++) { 
			$week .= sprintf('<td class="youbi_%d">%d</td>', $youbi % 7, $day);

			if ($youbi % 7 == 6 OR $day == $lastDay) {
				if ($day == $lastDay) {
					$week .= str_repeat('<td></td>', 6 - ($youbi % 7));
				}
				$this->weeks[] = '<tr>' . $week . '</tr>';
				$week = '';
			}
		}
	}

	public function getWeeks() {
		return $this->weeks;
	}

	public function prev() {
		return date("Y-m", mktime(0,0,0,date("n", $this->timeStamp)-1,1,date("Y", $this->timeStamp)));
	}

	public function next() {
		return date("Y-m", mktime(0,0,0,date("n", $this->timeStamp)+1,1,date("Y", $this->timeStamp)));
	}

	public function yearMonth() {
		return date("Y-m", $this->timeStamp);
	}

}

// var_dump($weeks);

?>