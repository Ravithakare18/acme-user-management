import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit {
  users: any[] = [];
  editedUsers: any[] = [];
  headers: string[] = [];
  editing: { [key: number]: boolean } = {};
  loading = false;
  error = '';

  constructor(private userService: User, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.userService.fetchUsers().subscribe({
      next: (data) => {
        this.users = Array.isArray(data)
          ? data
          : data && (data as any).data
          ? (data as any).data
          : [];
        this.editedUsers = this.users.map((u) => ({ ...u }));
        this.headers = this.computeHeaders(this.users);
        this.userService.setUsers(this.users);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load users.';
        this.loading = false;
      },
    });
  }

  computeHeaders(users: any[]): string[] {
    const set = new Set<string>();
    users.forEach((u) => {
      Object.keys(u || {}).forEach((k) => set.add(k));
    });
    return Array.from(set);
  }

  isPrimitive(v: any) {
    return v === null || ['string', 'number', 'boolean'].includes(typeof v);
  }

  toggleEdit(i: number, ev?: Event) {
    if (ev) ev.stopPropagation();
    this.editing[i] = !this.editing[i];
    if (!this.editing[i]) {
      this.users[i] = { ...this.editedUsers[i] };
    }
  }

  goToDetails(i: number) {
    this.router.navigate(['/users', i]);
  }
}
