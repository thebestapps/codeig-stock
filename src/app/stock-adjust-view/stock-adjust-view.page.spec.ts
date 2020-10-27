import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StockAdjustViewPage } from './stock-adjust-view.page';

describe('StockAdjustViewPage', () => {
  let component: StockAdjustViewPage;
  let fixture: ComponentFixture<StockAdjustViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockAdjustViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StockAdjustViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
