import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})
export class DatesComponent implements OnInit {
  constructor(public fb: FormBuilder) { }

  // Boolean values
  isSubmitted = false;
  isSelectedFromMonth = false;

  // Selected values
  selectedFromYear: any;
  selectedFromMonth: any;
  selectedToYear: any;
  selectedToMonth: any;

  // From - To
  fromYear: any[] = [];
  toYear: any[] = [];
  toMonths: any[] = [];
  months: any = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  // Data when two selected year are different

  fromYrMonths: any[] = [];
  toYrMonths: any[] = [];
  betweenMonths: any[] = [];

  yearDifference: any;

  // final result
  generatedData: any[] = [];
  // Formated generated data
  formated: any[] = [];
  // create a formGroup that corresponds to the template
  formDataGroup = this.fb.group({
    MonthlyData: this.fb.array([])
  });

  builderForm = this.fb.group({
    FromYear: ['', [Validators.required]],
    FromMonth: ['', [Validators.required]],
    ToYear: ['', [Validators.required]],
    ToMonth: ['', [Validators.required]]
  });

  // addforms for monthly data
  addMonthData(): void {
    const control = this.formDataGroup.get('MonthlyData');
    for (const i of this.formated) {
      console.log(i);
      (control as FormArray).push(
        this.fb.group({
          month: [`${i}`, [Validators.required]],
          firstName: ['', [Validators.required]],
          middleName: ['', [Validators.required]],
          lastName: ['', [Validators.required]]
        })
      );
    }
  }

  // Choose month using select dropdown
  changeFromMonth(e) {
    console.log('into the from month ....');
    console.log(JSON.stringify(e.target.value.split(':')));
    this.selectedFromMonth = this.months.indexOf(e.target.value.split(':')[1].trim());
    console.log(`selectedFromMonth:${this.selectedFromMonth}`);
    console.log(this.months);
    this.isSelectedFromMonth = true;
    // clear all the values that previuosly stored
    this.clearner();

    // this.From.setValue(e.target.value, {
    //   onlySelf: true
    // });
  }
  changeToMonth(e) {
    console.log('......................');
    console.log(JSON.stringify(e.target.value.split(':')));
    this.selectedToMonth = this.months.indexOf(e.target.value.split(':')[1].trim());
    console.log(`selectedToMonth:${this.selectedToMonth}`);
    // clear all the values that previuosly stored
    this.clearner();
    // this.From.setValue(e.target.value, {
    //   onlySelf: true
    // });
  }
  changeFromYear(e) {
    console.log(e.target.value);
    this.toYear = this.fromYear.slice(e.target.value.split(':')[0] - 1, this.fromYear.length);
    console.log(e.target.value.split(':')[1]);
    this.selectedFromYear = e.target.value.split(':')[1];
    console.log(this.toYear);

    // clear all the values that previuosly stored
    this.clearner();
    // this.From.setValue(e.target.value, {
    //   onlySelf: true
    // });
  }
  changeToYear(e) {
    console.log(typeof e.target.value);
    console.log(JSON.stringify(e.target.value.split(':')));
    // console.log(`${this.selectedFromYear} == ${(e.target.value).split(':')[1]}`);
    // console.log(this.selectedFromYear === (e.target.value).split(':')[1]);
    if (this.selectedFromYear === e.target.value.split(':')[1]) {
      console.log(this.months.length);
      this.toMonths = this.months.slice(+this.selectedFromMonth + 1, +this.months.length);
      console.log(this.toMonths);
    } else {
      this.toMonths = this.months;
    }
    this.selectedToYear = e.target.value.split(':')[1];

    // clear all the values that previuosly stored
    this.clearner();

    // this.From.setValue(e.target.value, {
    //   onlySelf: true
    // });
  }
  generateData() {
    console.log(this.selectedFromYear);
    console.log(this.selectedToYear);
    console.log(this.selectedFromMonth);
    console.log(this.selectedToMonth);

    if (this.selectedFromYear === this.selectedToYear) {
      // used slice because it doesn't change original array
      console.log(`selectedFromMonth-${this.selectedFromMonth}`);
      console.log(`selectedToMonth-${this.selectedToMonth}`);
      this.generatedData = this.months.slice(this.selectedFromMonth, +this.selectedToMonth + 1);
    } else {
      console.log(`selectedFromMonth-${this.selectedFromMonth}`);
      console.log(`selectedToMonth-${this.selectedToMonth}`);

      console.log(`yearDifference: ${this.yearDifference}`);
      this.fromYrMonths = this.months.slice(this.selectedFromMonth, +this.months.length);
      if (this.selectedToMonth === 0) {
        this.toYrMonths = ['JAN'];
      } else {
        this.toYrMonths = this.months.slice(0, +this.selectedToMonth + 1);
      }

      for (let i = 0; i < this.yearDifference; i++) {
        this.betweenMonths = this.betweenMonths.concat(this.months);
        console.log(`at i = ${i}-${this.betweenMonths}`);
      }
      console.log(`fromYrMonths: ${this.fromYrMonths}`);
      console.log(`between months:${this.betweenMonths}`);
      console.log(`toYrMonths: ${this.toYrMonths}`);
      this.generatedData = this.generatedData.concat(this.fromYrMonths);
      this.generatedData = this.generatedData.concat(this.betweenMonths);
      this.generatedData = this.generatedData.concat(this.toYrMonths);
    }
    this.formatedData();
    console.log(this.formated);
    console.log(`generatedData : ${this.generatedData}`);
  }
  // Formated output

  formatedData(): void {
    const start = this.months[0];
    let year = this.selectedFromYear;
    let startFlagForJAN = 0;
    // check if genereted data has 'JAN' as first element

    if (this.generatedData[0] === start) {
      startFlagForJAN = 1;
    }

    this.formated = this.generatedData.map((i) => {
      if (i === start) {
        if (startFlagForJAN) {
          year--;
          startFlagForJAN = 0;
        }
        year++;
      }
      return `${i}-${year}`;
    });
  }

  // Template Driven Form
  onSubmit() {
    this.isSubmitted = true;
    this.yearDifference = this.selectedToYear - this.selectedFromYear - 1;
    if (!this.builderForm.valid) {
      return false;
    } else {
      console.log(JSON.stringify(this.builderForm.value));
    }
    this.generateData();
    this.addMonthData();
  }

  // generate 100 years

  generateYear() {
    for (let i: any = 2000; i <= 2100; i++) {
      this.fromYear.push(i);
    }
  }

  // cleaner

  clearner() {
    // clear all the values that previuosly stored
    this.generatedData = [];
    this.betweenMonths = [];
    this.fromYrMonths = [];
    this.toYrMonths = [];
  }
  // Last output
  finalData() {
    console.log(this.formDataGroup.value);
    console.log(this.formDataGroup.valid);
  }

  ngOnInit() {
    this.generateYear();
  }
}
