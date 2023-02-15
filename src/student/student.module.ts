import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose/dist';
import {  StudentSchema } from 'src/schema/student.schema';

@Module({
  imports : [ MongooseModule.forFeature([{name : "students" , schema:StudentSchema}]) ],
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
