<?php

$lines = [
	'40.00 Thijs Danny,Danny,Thijs,Stefan,Den',
	'45.00 Danny Danny,Thijs,Stefan,Den',
	'36.00 Stefan Danny,Thijs,Stefan',
	'40.00 Stefan Danny,Thijs,stefan,Den',
	'40.00 Danny Danny,Thijs,Stefan,Den',
	'12.00 Stefan Thijs,Stefan,Den',
	'44.00 Danny Danny,Thijs,Stefan,Den',
	'42.40 Den Danny,Stefan,Den,Den',
	'40.00 danny Danny,Thijs,Stefan,Den',
	'50.40 Thijs Danny,Thijs,Den',
	'48.00 Den Danny,thijs,Stefan,Den',
	'84.00 Thijs Thijs,Stefan,den'
];

$Calculator = new Calculator($lines);
$Calculator->printBill();

class Calculator{

	private $bills = [];

	public function __construct($bills){

		foreach($bills as $bill_item){

			$this->bills[] = new BillItem($bill_item);
		}
	}

	public function printBill(){

		$payout = $this->calculate();

		foreach($payout as $debtor => $lines){
			$debtor = ucfirst($debtor);

			foreach($lines as $creditor => $amount){

				$amount = number_format($amount, 2);
				$creditor = ucfirst($creditor);
				echo "$debtor pays $creditor $amount" . PHP_EOL;
			}
		}
	}

	private function calculate(){

		// Implement me!
		$transactions = $this->extractTransactions($this->bills[]);
		$reducedTransactions = $this->reduceTransactions($transactions);
		
	}

	private function extractTransactions($bills) {
		//create a transaction array
		foreach($bills as $bill){
			$quota = $bill->$price/sizeof($bill->$attendees);
			//sort attendee array
			foreach($bill->$attendees as $attendee){
				//create the transaction and add into transaction array 
				//if debtor/creditor already exists just add up value
			}
		}
	}

	private function reduceTransactions($transactions) {

	}
}

class BillItem{

	private $price;
	private $paid_by;
	private $attendees = [];

	public function __construct($row){

		$data = explode(' ', $row);
		$this->price = (float) $data[0];
		$this->paid_by = strtolower($data[1]);
		foreach(explode(',', $data[2]) as $debtor){

			$this->attendees[] = strtolower($debtor);
		}
	}
}

class Transaction {
	private $debtor;
	private $creditor;
	private $amount;

	public function __construct($d, $c, $a){
		$debtor = $d;
		$creditor = $c;
		$amount = $a;
	}

	public function addAmount($a){
		$amount = $amount + $a;
	}
}
