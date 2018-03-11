import { Component, OnInit, Output, Input } from '@angular/core';
import { Task } from 'app/tasks.model';
import { LoginService } from 'app/login/login.service';
import { TaskService } from 'app/task.service';
declare var $: any;
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import { UserService } from 'app/user.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { User } from 'app/users.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  assignedToTasks: Array<Task> = [];
  assignedByTasks: Array<Task> = [];
  allItems: Array<Task> = [];
  currentUser: string;
  uid: string;
  users: FirebaseListObservable<User[]>;
  tasks: Array<Task>;
  task: Task;
  isEditable: boolean;
  editableTask: Task;

  constructor(public loginService: LoginService,
    private taskService: TaskService,
    private af: AngularFireAuth,
  private userService: UserService) {
    this.isEditable = false;
  }

  ngOnInit() {
    this.af.authState.subscribe(authState => {
      this.currentUser = (authState.displayName != null) ? authState.displayName.split(' ')[0] : authState.email.split('@')[0];
      this.userService.addUserToFirebase(authState.uid, this.currentUser);
      this.uid = authState.uid;
      this.TaskByUser(this.uid);
      this.AllTasks();
    });
  }

  TaskByUser(uid): void {
    // this.taskService.TaskByUser(this.currentUser).subscribe(res => {this.assignedByTasks = res }, err => {console.log(err)});
    // this.taskService.TasksByUser(uid).subscribe(res => this.assignedByTasks = this.OpenTask(res), err => console.log(err));
  }

  AllTasks(): void {
    this.taskService.getAllTasks().subscribe(res => this.allItems = res);
  }

  deleteTask(task) {
    this.taskService.deleteTask(task);
  }

  closeTask(task) {
    this.taskService.closeTask(task);
  }

  makeEditable(task) {
    this.editableTask = task;
    this.isEditable = true;
  }

  trackByFn(index: number, task: Task) {
    return index;
  }
  // showModal(): boolean {
  //   $('#createTask').modal('show');
  //   return false;
  // }

  // showTaskDetails(task): boolean {
  //   this.task = task;
  //   $('#showTask').modal('show');
  //   return false;
  // }

}
