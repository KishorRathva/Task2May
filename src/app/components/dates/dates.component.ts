import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})
export class DatesComponent implements OnInit {

  isSubmitted = false;
  isSelectedFromMonth = false;

  selectedFromYear: any ;
  selectedFromMonth: any;
  selectedToYear: any ;
  selectedToMonth: any;
  fromYear: any = [];
  toYear: any = [];
  toMonths: any = [];
  months: any = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  generatedData: any = [];
  constructor(public fb: FormBuilder) { }

  builderForm = this.fb.group({
    FromYear: ['', [Validators.required]],
    FromMonth: ['', [Validators.required]],
    ToYear: ['', [Validators.required]],
    ToMonth: ['', [Validators.required]],
  });


  // Choose month using select dropdown
  changeFromMonth(e) {
    console.log('into the from month ....');
    console.log(JSON.stringify((e.target.value).split(':')));
    this.selectedFromMonth = (e.target.value).split(':')[0] ;
    console.log(this.selectedFromMonth);
    this.isSelectedFromMonth = true;

    // this.From.setValue(e.target.value, {
    //   onlySelf: true
    // });
  }
  changeToMonth(e) {
    console.log(typeof(e.target.value));
    console.log(JSON.stringify((e.target.value).split(':')));
    this.selectedToMonth = (e.target.value).split(':')[0] ;
    // this.From.setValue(e.target.value, {
    //   onlySelf: true
    // });
  }
  changeFromYear(e) {
    console.log(e.target.value);
    this.toYear = this.fromYear.slice((e.target.value).split(':')[0] - 1, this.fromYear.length);
    console.log((e.target.value).split(':')[1]);
    this.selectedFromYear = (e.target.value).split(':')[1];
    console.log(this.toYear);
    // this.From.setValue(e.target.value, {
    //   onlySelf: true
    // });
  }
  changeToYear(e) {
    console.log(typeof(e.target.value));
    console.log(JSON.stringify((e.target.value).split(':')));
    if (this.selectedFromYear === (e.target.value).split(':')[1] ) {
        this.toMonths = this.months.slice(this.selectedFromMonth, this.months.length);
     } else {
       this.toMonths = this.months ;
     }
    this.selectedToYear = (e.target.value).split(':')[1];

    // this.From.setValue(e.target.value, {
    //   onlySelf: true
    // });
  }


  // Getter method to access formcontrols

  get monthName() {
    return this.builderForm.get('Form');
  }
  generateData() {
    console.log(this.selectedFromYear);
    console.log(this.selectedToYear);
    console.log(this.selectedFromMonth - 1);
    console.log(this.selectedToMonth);

    if (this.selectedFromYear === this.selectedToYear) {
      this.generatedData = this.months.splice(this.selectedFromMonth - 1, +this.selectedToMonth + 1);
      console.log(this.generatedData);
    }


  }
  // Template Driven Form
  onSubmit() {
      this.isSubmitted = true ;
      if (! this.builderForm.valid) {
        return false;
      } else {
        alert(JSON.stringify(this.builderForm.value));
      }
      this.generateData();
    }

  // generate 100 years

  generateYear() {
    for (let i: any = 2000; i <= 2100; i++) {
      this.fromYear.push(i);
    }
  }

  ngOnInit() {

    this.generateYear();
  }

}
