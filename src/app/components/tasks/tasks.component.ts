import { Component, OnInit,} from '@angular/core';
import { Task } from 'src/app/Tasks';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})

export class TasksComponent implements OnInit{
  task: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((task) => (this.task = task));
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => (this.task = this.task.filter(t => t.id !== task.id)));
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskreminder(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => (this.task.push(task)));
  }
}
