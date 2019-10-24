import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OrderPipe } from 'ngx-order-pipe';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'simpleProject';
  searchTerm: string;
  order: string = 'name';
  reverse: boolean = false;
  personsFilter: any = { name: '' };
  sortedPersons: any[];
  arrList: string[];
  url = '/assets/data/dummyServer.json';  //This is used as a fake json API (fake server to provide some data).

  //Class constructor, in which transformation (pipes such as filter and sort) are performed.
  constructor(private http: HttpClient, private orderPipe: OrderPipe, private filterPipe: FilterPipe) {
    this.sortedPersons = orderPipe.transform(this.arrList, 'name');
    console.log(this.sortedPersons);
    console.log(filterPipe.transform(this.arrList, { name: 'M' }));
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  //This method fetches data from the API using GET HTTP method
  ngOnInit() {
    this.http.get(this.url).subscribe(
      data => {
        this.arrList = data as string[];
        console.log(this.arrList[1]);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
}
