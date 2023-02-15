import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student } from './schema/student.schema';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    StudentModule,
    MongooseModule.forRoot("mongodb://127.0.0.1:27017", {dbName:"crudnestjs"}),
   
  ],
})
export class AppModule {}
