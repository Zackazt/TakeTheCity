import {Router, RouterModule} from '@angular/router';
import {PersonListComponent} from './person-list/person-list.component';
import {PersonDetailComponent} from './person-detail/person-detail.component';
import {FollowupFormComponent} from './followup-form/followup-form.component';
import {ContactManagementSystemComponent} from './contact-management-system/contact-management-system.component';

import {LogInFormComponent} from './authorization/login-form.component';
import {AuthorizationGuard} from './authorization/authorization-guard.service';

export const routingMain = RouterModule.forRoot([
	{ path: 'dashboard', component: ContactManagementSystemComponent, canActivate: [AuthorizationGuard] }, //Create dashboard..
	{ path: 'contact', component: ContactManagementSystemComponent, canActivate: [AuthorizationGuard] },
	{ path: 'contact/:id', component: PersonDetailComponent, canActivate: [AuthorizationGuard] },
	{ path: 'followup', component: FollowupFormComponent, canActivate: [AuthorizationGuard] },
	{ path: 'login', component: LogInFormComponent },
	{ path: '**', component: LogInFormComponent, canActivate: [AuthorizationGuard] }, //404 page.
]);