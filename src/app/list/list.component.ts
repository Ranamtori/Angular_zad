import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user.model';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { faUserGroup, faPlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AddEditUserComponent } from '../modals/addedit/addedit.component';
import { DeleteUserComponent } from '../modals/delete/delete.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users: User[] = [];
  faUserGroup = faUserGroup;

  modalRef: MdbModalRef<AddEditUserComponent> | null = null;
  deleteModalRef: MdbModalRef<DeleteUserComponent> | null = null;

  constructor(private userService: UserService, private modalService: MdbModalService) {}

  ngOnInit() {
    this.users = this.userService.getUsers()
    console.log(this.userService.users)
  }

  onUserUpdated(updatedUser: User) {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  onUserDeleted(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
  }

  openAddUserModal() {
    this.modalRef = this.modalService.open(AddEditUserComponent, {
      data: {
        editMode: false,
        currentUser: { id: 0, first_name: '', last_name: '', email: '', avatar: '' }
      }
    });

    this.modalRef.onClose.subscribe((result: any) => {
      if (result && result.user) {
        this.users.push(result.user);
      }
    });
  }
}
