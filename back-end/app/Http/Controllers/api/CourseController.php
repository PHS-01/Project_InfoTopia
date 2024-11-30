<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Controllers\{
    HasMiddleware, Middleware
};
use App\Models\Course;
use App\Http\Resources\{
    CourseResource, CourseCollection
};

class CourseController extends Controller implements HasMiddleware
{
    private array $validationMessages = [
        'name.required' => 'O nome é obrigatório',
        'name.string' => 'O nome deve ser um texto',
        'name.max' => 'O nome não pode ser maior que 40 caracteres'
    ];

    public function index()
    {
        return new CourseCollection(Course::paginate());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
        ], $this->validationMessages);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $course = Course::create([
            'name' => $request->name,
        ]);

        return new CourseResource($course);
    }

    public function show(Course $course)
    {
        return new CourseResource($course);
    }

    public function update(Request $request, Course $course)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
        ], $this->validationMessages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $course->update([
            'name' => $request->name,
        ]);

        return new CourseResource($course);
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json(['message' => 'Curso deletado com sucesso']);
    }

    public static function middleware() : array
    {
        return [
            new Middleware('can:viewAny,App\Models\Course', only: ['index', 'show']),
            new Middleware('can:update,course', only: ['update']),
            new Middleware('can:create,App\Models\Course', only: ['store']),
            new Middleware('can:delete,App\Models\Course', only: ['destroy']),
        ];
    }
}