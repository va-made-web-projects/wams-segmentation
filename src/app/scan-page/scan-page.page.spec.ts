import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScanPagePage } from './scan-page.page';

describe('ScanPagePage', () => {
  let component: ScanPagePage;
  let fixture: ComponentFixture<ScanPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ScanPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
