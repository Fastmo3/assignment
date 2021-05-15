import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Mgr } from '../../../models/mgr';

declare var module: {
  id: string;
}

@Component({
  //moduleId: module.id,
  selector: 'app-lister',
  templateUrl: './lister.component.html',
  styleUrls: ['./lister.component.css'],
  providers: [AppService]
})
export class ListerComponent implements OnInit {

  mgrs: Mgr[] = [];
  mgr = new Mgr();

  constructor(private router: Router,
  private appService: AppService) { }

  ngOnInit(): void {
    this.getMgrs();
  }
  getMgrs() {
    this.appService.getMgrs().subscribe(res => {
      this.mgrs = res as Mgr[];
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  delMag(mgr: Mgr) {
    this.appService.deleteMgr(mgr._id).subscribe(() => {
      this.mgrs.splice(this.mgrs.indexOf(mgr), 1);
    });
  }

}
