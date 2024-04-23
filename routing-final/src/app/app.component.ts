import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('f') formControl: NgForm;
  answers: any;

  projectForm: FormGroup;

  defaultOption = 'advanced';

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectName: new FormControl(
        null,
        [Validators.required, this.validateProjectName.bind(this)],
        this.validateProjectNameAsAsync
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl('finished', [Validators.required]),
    });
    console.log(this.projectForm.controls.email, 'asd');
    this.projectForm.controls.projectName.statusChanges.subscribe(
      (status: any) => {
        console.log(status, 'asd');
      }
    );
  }

  validateProjectName(control: FormControl) {
    if (control.value === 'Test') {
      return { forbiddenName: true };
    }
    return null;
  }

  validateProjectNameAsAsync(
    control: FormControl
  ): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test123') {
          resolve({ forbiddenName: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.formControl.value);
    this.answers = {
      mail: this.formControl.value.email,
      option: this.formControl.value.option,
      password: this.formControl.value.password,
    };
    // this.formControl.setValue({
    //   email: '',
    //   password: '',
    //   option: this.defaultOption,
    // });
    this.formControl.resetForm({ option: this.defaultOption });
  }
}
