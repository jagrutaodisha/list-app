import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarModule } from 'primeng/primeng';
import * as moment from 'moment';
import { Task } from 'app/tasks.model';
import { LoginService } from 'app/login/login.service';
import { TaskService } from 'app/task.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'app/user.service';
declare var $: any;

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  addItem: FormGroup;
  name: AbstractControl;
  createdDate: string;
  assignedBy: string;
  assignedByPhotoUrl: string;
  tempAssignedByName: string;

  @Input() tasks: Array<Task>;
  done: boolean;

  constructor(private fb: FormBuilder,
    private taskService: TaskService,
    private loginService: LoginService,
    private userService: UserService,
  ) {
    this.addItem = fb.group({
      'name': ['', Validators.required],
    });

    this.name = this.addItem.controls['name'];
    this.createdDate = (new Date()).toString();
    this.done = false;

    this.userService.getCurrentUserDetails()
      .subscribe(authState => {
        this.assignedBy = authState.uid;
        this.assignedByPhotoUrl = authState.photoURL;
        this.tempAssignedByName = (authState.displayName != null) ? authState.displayName.split(' ')[0] : authState.email.split('@')[0];
      });
  }

  ngOnInit() {
  }

  createTask(value: any): boolean {
    value.done = this.done;
    value.assignedByName = this.tempAssignedByName;
    value.createdDate = this.createdDate;
    value.assignedBy = this.assignedBy;
    value.assignedByPhotoUrl = this.assignedByPhotoUrl;
    this.taskService.createTask(value);
    this.addItem.reset();
    return false;
  }
}
