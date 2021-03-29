import { Component, OnInit } from '@angular/core';
import { Distributor } from '../interfaces/distributor';
import { DistributorService } from '../services/distributor.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrls: ['./distributors.component.css']
})
export class DistributorsComponent implements OnInit {

  displayedColumns: string[] = ['number', 'name', 'tin', 'kpp', 'externalId', 'legalAddress', 'actualAddress', 'formOfActivity'];
  distributors: Distributor[] = [];

  length = 0;
  pageSize = 10;
  pageNumber = 1;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private distributorServise: DistributorService ) { }


  ngOnInit(): void {
    this.getDistributors(this.pageSize, this.pageNumber)
  }

  getDistributors(pageSize: number, pageNumber: number){
    this.distributorServise.getDistributors(pageSize, pageNumber).subscribe((data)=>{
      this.distributors = data.items;
      this.length = data.totalCount;
    })
  }

  changePage(event: PageEvent){
    this.pageNumber = ++event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDistributors(this.pageSize, this.pageNumber);
  }

}
