import { Test } from '@nestjs/testing';
import { CouriersModule } from './couriers.module';

describe('CouriersModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [CouriersModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(CouriersModule)).toBeInstanceOf(CouriersModule);
    expect(module.get(CouriersModule)).toBeInstanceOf(CouriersModule);
  });
});
