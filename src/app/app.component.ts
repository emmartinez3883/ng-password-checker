import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { appService } from './app.service';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [appService]
})

export class AppComponent implements OnInit {
    public pwdForm: FormGroup;
    count: any;

    constructor(private _appService: appService, private _fb: FormBuilder, public ngProgress: NgProgress) { }

    ngOnInit() {
        this.pwdForm = this._fb.group({
            password: ['', Validators.required]
        });
    }

    save(password: string) {
       // console.log(sha1(password));
        this.ngProgress.start();

        this._appService.getPwnedCount(`${password}`)
            .subscribe(data => { this.count = data },
            err => {
                if (err.status == 404)
                {
                    this.count = 0;
                }
                else 
                {
                    this.count = -1;
                }
            });

        this.ngProgress.done();
    }
}
