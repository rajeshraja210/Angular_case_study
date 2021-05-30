import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
  Input,
} from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean;
  authSubscription: Subscription;
  CurrentUserSubscription: Subscription;
  // @Input() CurrentUser: string='Test';
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
        // let result=this.authService;
        // this.CurrentUser= JSON.parse(localStorage.getItem("user"));
        // return user !== null;
      }
    );
    if (!this.isAuth) {
      // this.isAuth= this.authService.isAuthenticated.subscribe(
      //   (authStatus) => {
      //     this.isAuth = authStatus;
      //   }
      //   );
      this.isAuth = this.authService.currentUserAuth;
    }
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
