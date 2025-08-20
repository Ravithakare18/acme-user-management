import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../services/user';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail implements OnInit {
  user: any = null;
  index: number = -1;

  constructor(private route: ActivatedRoute, private userService: User, private router: Router) {}

  ngOnInit(): void {
    const idx = this.route.snapshot.paramMap.get('index');
    this.index = idx ? Number(idx) : -1;
    this.user = this.userService.getUser(this.index);

    if (!this.user) {
      this.userService.fetchUsers().subscribe((data) => {
        const arr = Array.isArray(data)
          ? data
          : data && (data as any).data
          ? (data as any).data
          : [];
        this.userService.setUsers(arr);
        this.user = this.userService.getUser(this.index);
      });
    }
  }

  keys(): string[] {
    return this.user ? Object.keys(this.user) : [];
  }

  back() {
    this.router.navigate(['/users']);
  }
}
