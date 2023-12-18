import { Routes } from '@angular/router';
import { AdvancedComponent } from './components/advanced/advanced.component';
import { BasicComponent } from './components/basic/basic.component';

export const routes: Routes = [
    { path:'basic-search', component: BasicComponent },
    { path:'advanced-search', component: AdvancedComponent }
];
