import { User } from '../user';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAllUsers } from '../store/user.selectors';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id: string;
  user: User;
  user$: Observable<User>;
  loading = false;
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private store: Store) { }

  ngOnInit() {
    // this.user = new User();
    this.loading = true;
    this.id = this.route.snapshot.params['id'];
    this.store.select(getAllUsers).subscribe(users => {
        this.user = users.find(user => user.uId === this.id);
        this.loading = false;
    });

    // this.userService.getUser(this.id)
    //   .subscribe(data => {
    //     console.log(data);
    //     this.loading = false;
    //     this.user = data;
    //   }, error => console.log(error));
  }

  list(){
    this.router.navigate(['users']);
  }
}
