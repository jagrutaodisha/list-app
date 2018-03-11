import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../tasks.model';
import { TaskService } from '../task.service';
import { LoginService } from '../login/login.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  addItem: FormGroup;
  name: AbstractControl;
  createdDate: string;
  assignedBy: string;
  tempAssignedByName: string;
  currentTask: Task;
  @Input() task: Task;

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

    this.userService.getCurrentUserDetails()
      .subscribe(authState => {
        this.assignedBy = authState.uid;
        this.tempAssignedByName = (authState.displayName != null) ? authState.displayName.split(' ')[0] : authState.email.split('@')[0];
      });
  }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    this.currentTask = changes.task.currentValue;
    if (this.currentTask) {
      this.name.setValue(this.currentTask.name);
    }
  }

  updateTask(value: any): void {
    this.currentTask.name = value.name;
    this.currentTask.createdDate = (new Date()).toString();
    this.taskService.updateTask(this.currentTask);
  }
}
